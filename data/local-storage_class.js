/**
 * Set an item in local storage, to keep data throughout pages
 * @param {string} itemName 
 * @param {*} data 
 */
export function setItem(itemName, data) {
    localStorage.setItem(itemName, JSON.stringify(data))
}

/**
 * Get an item from local storage
 * @param {string} itemName 
 * @return {*}
 */
export function getItem(itemName) {
    return JSON.parse(localStorage.getItem(itemName))
}

/**
 * Delete an item from the localstorage
 * @param {string} itemName 
 */
export function deleteItem(itemName){
    localStorage.deleteItem(itemName)
}