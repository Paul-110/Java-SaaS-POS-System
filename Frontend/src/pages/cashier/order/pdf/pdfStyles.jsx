import { StyleSheet } from "@react-pdf/renderer";

// Create PDF styles
export const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 30,
    backgroundColor: '#111827', // dark gray background
    color: '#D1D5DB', // light gray text
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563', // medium gray border
    paddingBottom: 10,
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#34D399', // emerald-400
  },
  storeAddress: {
    fontSize: 9,
    color: "#9CA3AF", // gray-400
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#FFFFFF',
  },
  invoiceNumber: {
    fontSize: 11,
    color: "#9CA3AF", // gray-400
  },
  customerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  customerName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  label: {
    fontSize: 9,
    color: "#9CA3AF", // gray-400
    fontWeight: "bold",
  },
  text: {
    fontSize: 10,
    color: '#D1D5DB',
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: '#374151', // gray-700
    borderRadius: 3,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: '#374151', // gray-700
    alignItems: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: '#1F2937', // gray-800
    borderBottomWidth: 1,
    borderBottomColor: '#374151', // gray-700
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: "left",
    fontSize: 9,
  },
  tableHeaderCell: {
    padding: 5,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#E5E7EB', // gray-200
  },
  totals: {
    marginTop: 20,
    alignSelf: "flex-end",
    width: "45%",
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  totalsLabel: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  totalsValue: {
    fontSize: 10,
    color: '#D1D5DB',
  },
  grandTotal: {
    borderTopWidth: 1,
    borderTopColor: '#4B5563',
    marginTop: 5,
    paddingTop: 5,
  },
  grandTotalLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: '#FFFFFF',
  },
  grandTotalValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: '#34D399', // emerald-400
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 9,
    color: "#9CA3AF", // gray-400
  },
});
