export interface Vendor {
  vendorType: {
    typeId: number;
    isForeigner: boolean;
  };
  vendorCompany: {
    name: string,
    vatNumber: string,
    taxNumber: string,
    country: string
  };
  vendorPrivate: {
    name: string;
    lastname: string;
    personalNumber: string
  };
}

export interface FormState<TEntity> {
  isValid: boolean;
  isPristine: boolean;
  value: TEntity;
}
