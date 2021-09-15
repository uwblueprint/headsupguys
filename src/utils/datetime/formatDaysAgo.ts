function formatDaysAgo(value: Date, locale?: string): string {
    const date = new Date(value);
    const deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24);
    const formatter = new Intl.RelativeTimeFormat(locale, {
        numeric: "auto",
    });
    return formatter.format(Math.round(deltaDays), "days");
}

export { formatDaysAgo };
