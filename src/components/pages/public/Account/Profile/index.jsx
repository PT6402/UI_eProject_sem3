import { UIBox } from "../../../../common";
import ChangePassword from "./ChangePassword";
import Info from "./Info";

export default function Profile() {
  return (
    <>
      <UIBox mb={3}>
        <Info />
      </UIBox>

      <UIBox mb={3}>
        <ChangePassword />
      </UIBox>
    </>
  );
}
