export interface ReceiptDataJson {
  formType: string;
  fields: {
    ReceiptType: GenericData;
    MerchantName: GenericData;
    MerchantAddress: GenericData;
    MerchantPhoneNumber: GenericData;
    Items: {
      name: string;
      valueType: string;
      value: {
        valueType: string;
        value: {
          Quantity: GenericData;
          Name: GenericData;
          TotalPrice: GenericData;
        };
      }[];
    };
    Subtotal: GenericData;
    Tax: GenericData;
    Tip: GenericData;
    Total: GenericData;
  };
}

export interface GenericData {
  name: string;
  valueData: {
    text: string;
  };
  valueType: string;
  value: string;
}
