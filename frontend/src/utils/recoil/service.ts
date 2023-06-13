import { atom, selector } from "recoil";
import { SERVICES_DETAIL_LIST } from "../values/ServicesDetailList";

export const serviceIdState = atom({
  key: "serviceIdState",
  default: "",
});

export const serviceSelector = selector({
  key: "serviceSelector",
  get: ({ get }) => {
    const serviceId = get(serviceIdState);
    const selectedService = SERVICES_DETAIL_LIST.find(
      (service) => service.id === serviceId
    );
    return selectedService;
  },
});
