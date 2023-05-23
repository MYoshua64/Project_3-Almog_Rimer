class CurrencyFormatter {
  public FormatCurrency(amount: number): string {
    let formatting_options = {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    };
    let currencyString = new Intl.NumberFormat("en-IL", formatting_options);
    return currencyString.format(amount);
  }
}

export const currencyFormatter = new CurrencyFormatter();
