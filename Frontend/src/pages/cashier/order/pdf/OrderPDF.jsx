import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { pdfStyles } from "./pdfStyles";

// Create PDF document
export const OrderPDF = ({ order }) => {
  return (
    <Document title={`Invoice - #${order.id}`}>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <View>
            <Text style={pdfStyles.storeName}>{order.branch?.name || 'POS Pro'}</Text>
            <Text style={pdfStyles.storeAddress}>
              {order.branch?.address || "123 Main St, Anytown, USA"}
            </Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <Text style={pdfStyles.invoiceTitle}>TAX INVOICE</Text>
            <Text style={pdfStyles.invoiceNumber}>#{order.id}</Text>
          </View>
        </View>

        <View style={pdfStyles.customerInfo}>
          <View>
            <Text style={pdfStyles.label}>Bill To:</Text>
            <Text style={pdfStyles.customerName}>
              {order.customer?.fullName || "Walk-in Customer"}
            </Text>
            <Text style={pdfStyles.text}>{order.customer?.phone || ""}</Text>
            <Text style={pdfStyles.text}>{order.customer?.email || ''}</Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <Text style={pdfStyles.label}>Date:</Text>
            <Text style={pdfStyles.text}>
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Text style={pdfStyles.label}>Payment Method:</Text>
            <Text style={pdfStyles.text}>{order.paymentType}</Text>
          </View>
        </View>

        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableHeader}>
            <Text style={[pdfStyles.tableHeaderCell, { flex: 4 }]}>Item</Text>
            <Text style={[pdfStyles.tableHeaderCell, { flex: 1, textAlign: 'center' }]}>Qty</Text>
            <Text style={[pdfStyles.tableHeaderCell, { flex: 1.5, textAlign: 'right' }]}>Price</Text>
            <Text style={[pdfStyles.tableHeaderCell, { flex: 1.5, textAlign: 'right' }]}>Total</Text>
          </View>
          {order.items?.map((item, index) => (
            <View key={index} style={pdfStyles.tableRow}>
              <Text style={[pdfStyles.tableCell, { flex: 4 }]}>
                {item.product?.name || item.productName}
              </Text>
              <Text style={[pdfStyles.tableCell, { flex: 1, textAlign: 'center' }]}>{item.quantity}</Text>
              <Text style={[pdfStyles.tableCell, { flex: 1.5, textAlign: 'right' }]}>
                ₹{item.price?.toFixed(2)}
              </Text>
              <Text style={[pdfStyles.tableCell, { flex: 1.5, textAlign: 'right' }]}>
                ₹{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={pdfStyles.totals}>
          <View style={pdfStyles.totalsRow}>
            <Text style={pdfStyles.totalsLabel}>Subtotal</Text>
            <Text style={pdfStyles.totalsValue}>
              ₹{order.totalAmount?.toFixed(2)}
            </Text>
          </View>
          <View style={pdfStyles.totalsRow}>
            <Text style={pdfStyles.totalsLabel}>Tax (GST @18%)</Text>
            <Text style={pdfStyles.totalsValue}>
              ₹{(order.totalAmount * 0.18).toFixed(2)}
            </Text>
          </View>
          <View style={[pdfStyles.totalsRow, pdfStyles.grandTotal]}>
            <Text style={pdfStyles.grandTotalLabel}>Grand Total</Text>
            <Text style={pdfStyles.grandTotalValue}>
              ₹{(order.totalAmount * 1.18).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={pdfStyles.footer}>
          <Text>Thank you for your business! Visit us again.</Text>
        </View>
      </Page>
    </Document>
  );
};
