function removeDuplicates(array, loose)
{
    if(loose === true)
        return array.filter((a, b) => array.indexOf(a) == b);

    return array.filter((a, b) => array.indexOf(a) === b);
}

module.exports = removeDuplicates;
