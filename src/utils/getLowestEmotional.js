
const negativeEmotions = ['FEAR', 'ANGRY', 'SADNESS'];
const positiveEmotions = ['JOY', 'SURPRISE', 'HAPPY'];

const getFilteredObject = (emotional, preferredEmotions) => {
    return Object.fromEntries(
        Object.entries(emotional)
            .filter(
                ([key]) => emotional[key] !== 0 && preferredEmotions.includes(key.toUpperCase())
            )
    )
};

const getHighestEmotionalValue = (emotional) => {
    const highestValue = Object.keys(emotional)
        .reduce((previousKey, currentKey) =>
            emotional[previousKey] > emotional[currentKey] ? previousKey : currentKey
        )

    return highestValue.toUpperCase() ?? null;
}

const getLowestEmotionalValue = (emotional) => {
    const lowestValue = Object.keys(emotional)
        .reduce((previousKey, currentKey) =>
            emotional[previousKey] < emotional[currentKey] ? previousKey : currentKey
        )
    return lowestValue?.toUpperCase() ?? null;
}

const getLowestEmotional = (diagramValues = []) => {
    const emotionalValues = {}

    for( const pair of diagramValues ) {
        emotionalValues[pair.name] = pair.value;
    }

    if( !Object.keys(emotionalValues).length ) return null;

    const negativeValues = getFilteredObject(emotionalValues, negativeEmotions);

    if( Object.keys(negativeValues).length ) {
        return getHighestEmotionalValue(negativeValues);
    }

    const positiveValues = getFilteredObject(emotionalValues, positiveEmotions);

    if ( Object.keys(positiveValues).length ) {
        return getLowestEmotionalValue(positiveValues)
    }

    return null;

}

export default getLowestEmotional;
