class DateFormatter {
  public formatDateForDisplay(rawDate: string): string {
    const neatDate = new Date(rawDate);
    return neatDate.toLocaleDateString();
  }

  public formatDateAsISO(rawDate: string): string {
    const neatDate = new Date(rawDate).toLocaleDateString();
    const dateParts = neatDate.split("/");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }
}

const dateFormatter = new DateFormatter();

export default dateFormatter;
