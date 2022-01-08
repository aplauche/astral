export const convertToUTC = (datestamp) => {
    return new Date((datestamp.getTime() - (datestamp.getTimezoneOffset() * 60000)))
}

export const convertToLocal = (datestamp) => {
    return new Date((datestamp.getTime() + (datestamp.getTimezoneOffset() * 60000)))
}