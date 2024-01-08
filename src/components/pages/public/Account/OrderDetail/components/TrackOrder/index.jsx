import { UIBox, UITypography } from "../../../../../../common";
import TimelineItem from "./TimelineItem";

function OrdersOverview() {
  return (
    <>
      <UITypography variant="h4" fontWeight="medium">
        Track order
      </UITypography>
      <UIBox mt={2}>
        <TimelineItem
          color="secondary"
          icon="notifications"
          title="Order received"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="secondary"
          icon="inventory_2"
          title="Generate order id #1832412"
          dateTime="22 DEC 7:21 AM"
        />
        <TimelineItem
          color="secondary"
          icon="shopping_cart"
          title="Order transmited to courier"
          dateTime="22 DEC 8:10 AM"
        />
        <TimelineItem
          color="success"
          icon="done"
          title="Order delivered"
          dateTime="22 DEC 4:54 PM"
        />
      </UIBox>
    </>
  );
}

export default OrdersOverview;
