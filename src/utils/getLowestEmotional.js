
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
    return Object.keys(emotional)
        .reduce((previousKey, currentKey) =>
            emotional[previousKey] > emotional[currentKey] ? previousKey : currentKey
        )
}

const getLowestEmotionalValue = (emotional) => {
    return Object.keys(emotional)
        .reduce((previousKey, currentKey) =>
            emotional[previousKey] < emotional[currentKey] ? previousKey : currentKey
        );
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

    return getLowestEmotionalValue(positiveValues);

}

export default getLowestEmotional;
