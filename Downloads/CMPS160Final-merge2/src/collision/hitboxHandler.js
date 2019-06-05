var _hitboxHandler = null;

/*
class HitboxHandler {
    constructor() {
        _hitboxHandler = this;

        this.hitboxCategories = {};
    }

    addHitboxToCategory(hitbox, category) {
        var index = -1;
        if (hitbox instanceof Hitbox) {
            if (!(category in this.hitboxCategories)) {
                this.hitboxCategories[category] = [];
            }
            index = this.hitboxCategories[category].length;
            this.hitboxCategories[category].push(hitbox);
        }
        return index;
    }

    getCategory(category) {
        return this.hitboxCategories[category];
    }
}
*/


class HitboxHandler {
    constructor() {
        _hitboxHandler = this;

        this.hitboxLookups = {};        //lookupID -> (category, index)
        this.nextID = 0;
        this.hitboxCategories = {};     //category -> hitbox array
    }

    /**
     * add a hitbox to a category
     */
    addHitboxToCategory(hitbox, category) {
        var lookup = -1;
        if (hitbox instanceof Hitbox) {
            if (!(category in this.hitboxCategories)) {
                this.hitboxCategories[category] = [];       //make a new category if necessary
            }

            //add hitbox to category
            var index = this.hitboxCategories[category].length; //get the hitbox's future index
            this.hitboxCategories[category].push(hitbox);   //add the hitbox to the category

            //add (category, index) to lookup table
            this.hitboxLookups[this.nextID] = [category, index];
            lookup = this.nextID;
            this.nextID++;

            console.log("hitbox (lookup, category):", lookup, category);
        }
        return lookup;
    }

    /**
     * check collisions between a hitbox (lookup) and a category
     */
    checkCollision(lookupID, category){
        //find the hitbox
        var hitbox = this.getHitbox(lookupID)

        //compare against category
        return hitbox.checkCollision(this.hitboxCategories[category]);
    }

    /**
     * Get a local hitbox
     * Only use this to do updates
     *
     * Returns null if no hitbox found
     */
    getHitbox(lookupID) {
        var hitboxLoc = this.hitboxLookups[lookupID];
        var hitbox = this.hitboxCategories[hitboxLoc[0]][hitboxLoc[1]];
        if (hitbox) {
            return hitbox;
        } else {
            return null;
        }
    }

    /**
     * Set the hitbox at a lookup to match an external hitbox
     * Primary use is to update hitboxes
     *
     * True if successful update, false if not
     */
    setHitbox(lookupID, hitbox) {
        var hitboxLoc = this.hitboxLookups[lookupID];
        if (hitboxLoc) {
            this.hitboxCategories[hitboxLoc[0]][hitboxLoc[1]] = hitbox;
            //console.log("hitbox updated:", lookupID);
            return true;
        } else {
            return false;
        }
    }
}