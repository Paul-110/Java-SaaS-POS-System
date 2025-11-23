
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "@/Redux Toolkit/features/customer/customerThunks";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CustomerForm = ({
  showCustomerForm,
  setShowCustomerForm
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.customer);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must be less than 50 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
    email: Yup.string().email("Please enter a valid email address").optional(),
  });

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(createCustomer(values)).unwrap();
      toast.success("Customer created successfully!");

      // Reset form and close dialog
      resetForm();
      setShowCustomerForm(false);
    } catch (error) {
      toast.error(error || "Failed to create customer");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowCustomerForm(false);
  };

  return (
    <Dialog open={showCustomerForm} onOpenChange={setShowCustomerForm}>
      <DialogContent className="max-w-md bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Add New Customer</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300">Full Name *</Label>
                <Field
                  as={Input}
                  id="fullName"
                  name="fullName"
                  placeholder="Enter customer full name"
                  className={`w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 ${errors.fullName && touched.fullName ? "border-red-500" : "border-white/20 hover:border-white/40"}`}
                />
                <ErrorMessage
                  name="fullName"
                  component="p"
                  className="text-sm text-red-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  className={`w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 ${errors.phone && touched.phone ? "border-red-500" : "border-white/20 hover:border-white/40"}`}
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-sm text-red-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  className={`w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 ${errors.email && touched.email ? "border-red-500" : "border-white/20 hover:border-white/40"}`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-400"
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleCancel} type="button" className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || loading} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {isSubmitting || loading ? "Creating..." : "Create Customer"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerForm;
