/**
 * @internal
 *
 * @param delta - MovableLimit to normalize
 * @returns
 */
export function normalizeDelta(delta) {
    const x = { unit: 'px', value: 0 };
    const y = { unit: 'px', value: 0 };
    const extractUnit = (text, axis) => {
        const unit = text.slice(-1);
        if (unit !== '%' && unit !== 'px') {
            throw new Error(`Invalid delta ${axis ?? ''} unit. Only 'px' and '%' are supported.`);
        }
        return unit;
    };
    if (delta) {
        if (typeof delta === 'string') {
            x.unit = y.unit = extractUnit(delta);
            x.value = y.value = parseInt(delta, 10);
            x.value = y.value = parseInt(delta.slice(0, -1));
        }
        else {
            x.unit = extractUnit(delta.x, 'x');
            x.value = parseInt(delta.x.slice(0, -1));
            y.unit = extractUnit(delta.y, 'y');
            y.value = parseInt(delta.y.slice(0, -1));
        }
    }
    return { x, y };
}
//# sourceMappingURL=normalizeDelta.js.map