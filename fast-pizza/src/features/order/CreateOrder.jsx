import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  const navigation = useNavigation(); 
  
  const isSubmitting = navigation.state === 'submitting'; 

  const formErrors = useActionData(); /** common use case to display errors */

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST"> {/** Form works best with react router. It maches closest route as well */}

        <div>
          <label>First Name</label>
          <input type="text" name="customer" required className=" rounded-full border border-zinc-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-orange-400 md:px-6 md:py-3" />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required className=" rounded-full border border-zinc-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-orange-400 md:px-6 md:py-3" />
          </div>
          {formErrors?.phone && <p> {formErrors.phone}</p> }
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required
            className="input"/>
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
            />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name = "cart" value ={JSON.stringify(cart)}/>
          <Button
            type= "primary"
            disabled={isSubmitting} >
            {isSubmitting ? "Placing Order..." : "Order now"}
          </Button>
        </div>
      
      </Form>
    </div>
  );
}

/** Form is intersected by action function  */
export async function action({request}) {
  const formData = await request.formData(); 
  const data = Object.fromEntries(formData); 
  
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  }; 
  
  const errors = {}; 
  if (!isValidPhone(order.phone)) errors.phone = "Please insert correct phone number."; 
  
  if (Object.keys(errors).length > 0) return errors; 
  
  const newOrder = await createOrder(order); 
  return redirect(`/order/${newOrder.id}`); 

}

export default CreateOrder;
