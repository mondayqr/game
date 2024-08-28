import { useSelector } from "react-redux";

const useCurrency = () => {
  const currency = useSelector((state) => state.defaultSettings.activeCurrency);
  return (price) => {
    const mainPrice = Number(price) * Number(currency.currency_rate);
    if (currency.currency_position === "left") {
      return `${currency.currency_icon}${mainPrice}`;
    } else {
      return `${mainPrice}${currency.currency_icon}`;
    }
  };
};

export default useCurrency;
