/**
 * Created by aman on 5/26/16.
 */

class HoleyPropertiesSet {
    constructor () {
        this.holeyPropertiesContainter = {};
    }

    add ({property, setter, propertyClass, postConditions = []} = {}) {
        this.holeyPropertiesContainter[property] = {
            setter: setter,
            propertyClass: propertyClass,
            postConditions: postConditions,
        };
    }

    remove (property) {
        delete this.holeyPropertiesContainter[property];
    }

    get (property) {
        return this.holeyPropertiesContainter[property];
    }

    applyOntoMorph(aMorph) {
        for (var property in this.holeyPropertiesContainter) {
            var setter = this.holeyPropertiesContainter[property].setter;
            var propertyClass = this.holeyPropertiesContainter[property].propertyClass;
            aMorph[setter](propertyClass.random(aMorph.world()));
        }

        var postConditionsPassed = true;
        for (var property in this.holeyPropertiesContainter) {
            var postConditions = this.holeyPropertiesContainter[property].postConditions;
            for (let postCondition of postConditions) {
                postConditionsPassed = postConditionsPassed && postCondition(aMorph);
            }
        }
        return postConditionsPassed;
    }
}

module.exports = {
    HoleyPropertiesSet: HoleyPropertiesSet
};
