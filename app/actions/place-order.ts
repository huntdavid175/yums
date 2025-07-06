"use server";

import { db } from "@/lib/firebaseAdmin";
// import { hostname } from "os";
// import { AnyActionArg } from "react";

// Function to get the next sequential order number
const getNextOrderNumber = async () => {
  const counterRef = db.collection("counters").doc("orderNumber");

  try {
    const result = await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);

      if (!counterDoc.exists) {
        // Initialize counter if it doesn't exist
        transaction.set(counterRef, { currentNumber: 1 });
        return 1;
      }

      const currentNumber = counterDoc.data()?.currentNumber || 0;
      const nextNumber = currentNumber + 1;

      // Update the counter
      transaction.update(counterRef, { currentNumber: nextNumber });

      return nextNumber;
    });

    return result;
  } catch (error) {
    console.error("Error getting next order number:", error);
    throw new Error("Failed to generate order number");
  }
};

const calculateOrderTotal = async (cartItems: any[]) => {
  let grandTotal = 0;

  for (const cartItem of cartItems) {
    const docRef = db.collection("menuItems").doc(cartItem.id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) throw new Error(`Product not found: ${cartItem.id}`);
    const product = docSnap.data();
    if (!product) throw new Error(`Product data is undefined: ${cartItem.id}`);

    const basePrice = product.price || 0;
    const sizeObj = product.sizes.find((s: any) => s.id === cartItem.size);
    const sizePrice = sizeObj ? sizeObj.price : 0;
    const extrasPrice = (cartItem.extras || []).reduce(
      (sum: number, extraId: string) => {
        const extraObj = product.extras.find((e: any) => e.id === extraId);
        return sum + (extraObj ? extraObj.price : 0);
      },
      0
    );
    const itemTotal =
      (basePrice + sizePrice + extrasPrice) * (cartItem.quantity || 1);
    grandTotal += itemTotal;
  }

  return grandTotal;
};

const createOrder = async (
  cartItems: any[],
  deliveryInformation: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    orderType: "dine-in" | "takeout" | "delivery";
    paymentMethod: string;
    deliveryAddress?: {
      street: string;
      city: string;
      zip: string;
    };
    tableNumber?: string;
    userId?: string;
    transactionId?: string;
  }
) => {
  let subtotal = 0;
  const items = [];

  for (const cartItem of cartItems) {
    // Fetch product from Firestore
    const docRef = db.collection("menuItems").doc(cartItem.id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) throw new Error(`Product not found: ${cartItem.id}`);
    const product = docSnap.data();
    if (!product) throw new Error(`Product data is undefined: ${cartItem.id}`);

    // Calculate backend-trusted price
    const basePrice = product.price || 0;
    const sizeObj = product.sizes.find((s: any) => s.id === cartItem.size);
    const sizePrice = sizeObj ? sizeObj.price : 0;
    const extrasPrice = (cartItem.extras || []).reduce(
      (sum: number, extraId: string) => {
        const extraObj = product.extras.find((e: any) => e.id === extraId);
        return sum + (extraObj ? extraObj.price : 0);
      },
      0
    );
    const itemUnitPrice = basePrice + sizePrice + extrasPrice;
    const itemTotal = itemUnitPrice * (cartItem.quantity || 1);

    // Add to items array
    items.push({
      itemId: cartItem.id,
      name: cartItem.name,
      quantity: cartItem.quantity,
      price: itemUnitPrice, // unit price, backend-calculated
      total: itemTotal, // total for this item
      notes: cartItem.notes || "",
      extras: cartItem.extras || [],
      size: cartItem.size || null,
    });

    subtotal += itemTotal;
  }

  // Example: 8% tax
  const tax = parseFloat((subtotal * 0.0).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  // Get the next sequential order number
  const orderNumber = await getNextOrderNumber();

  // Build order object
  const order = {
    orderNumber, // Sequential order number
    userId: deliveryInformation.userId || null,
    customerName: deliveryInformation.customerName,
    customerEmail: deliveryInformation.customerEmail,
    customerPhone: deliveryInformation.customerPhone,
    tableNumber: deliveryInformation.tableNumber || null,
    orderType: deliveryInformation.orderType,
    items,
    subtotal,
    tax,
    total,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: deliveryInformation.paymentMethod,
    transactionId: deliveryInformation.transactionId || null,
    deliveryAddress: deliveryInformation.deliveryAddress || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Save to Firestore
  const docRef = await db.collection("pending-orders").add(order);

  const paymentResponse = await makePaymentIntent({
    id: docRef.id,
    email: order.customerEmail,
    totalAmount: order.total,
    phone: order.customerPhone,
  });
  const payment = await paymentResponse.json();

  if (payment) return { order: { orderId: docRef.id, ...order }, payment };
};

const makePaymentIntent = async (orderDetails: any) => {
  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        email: orderDetails.email,
        amount: orderDetails.totalAmount * 100,
        currency: "GHS",
        metadata: {
          orderId: orderDetails.id,
        },
      }),
    }
  );
  return response;
};

export { calculateOrderTotal, createOrder };
