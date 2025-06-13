const getUniqueObjectArray = (data: any, key: any) => {
    const uniqueValues = [...new Set(data.map((item: any) => item[key]))]
        .filter(v => v !== undefined && v !== null);

    return uniqueValues.map(value =>
        data.find((item: any) => item[key] === value)
    );
};

export default getUniqueObjectArray;
