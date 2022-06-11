/** @param {any[]} arr */
function halves(arr)
{
    if(!Array.isArray(arr))
        throw new TypeError("Parameter is not an array");

    if(arr.length === 0)
        return [];
    if(arr.length === 1)
        return [[arr[0]]];

    const half = Math.ceil(arr.length / 2);
    const first = arr.slice(0, half);
    const second = arr.slice((arr.length - half) * -1);

    return [first, second];
}

module.exports = halves;
