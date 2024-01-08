import LayoutContract from "./LayoutContract";

export default function TpContract() {
  return (
    <>
      <LayoutContract
        title="profile information"
        info={{
          ContractID: "123123",
          fullName: "Alec M. Thompson",
          phone: "(44) 123 1234 123",
        }}
      />
    </>
  );
}
