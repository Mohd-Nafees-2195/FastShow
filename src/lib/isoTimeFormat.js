// const isoTimeFormat = (dateTime) => {
//     const date = new Date(dateTime);
//     const localTime = date.toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//     });
//     return localTime
// }

// export default isoTimeFormat;
const isoTimeFormat = (dateTime) => {
    const date = new Date(dateTime);

    const utcDate = date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const utcTime = date.toLocaleTimeString('en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: true,
    });

    return `${utcTime}`;
}

export default isoTimeFormat;
