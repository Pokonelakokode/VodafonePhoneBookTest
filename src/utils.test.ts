import {getHash, isObject, loadFromStorage, saveToStorage, setHash, validateEmail} from "./utils";
import JSONusers from './users.json';
describe("setHash",() => {
    it('should return an empty string for an empty object', function () {
        setHash();
        expect(window.location.hash).toBe("")
    });

    it('should set correct user id to hash', function () {
        setHash({user:2});
        expect(window.location.hash).toBe("#user=2")
    });
    it('should set correct user id for negative number', function () {
        setHash({user: -1});
        expect(window.location.hash).toBe("#user=-1");
    });
    it('should set empty hash to non object parameter', function () {
        setHash("Not an object" as {});
        expect(window.location.hash).toBe("");
    });
});
describe("saveToStorage",() => {
    it('should create an empty users storage without param', function () {
        saveToStorage();
        expect(JSON.parse(localStorage.getItem("users")!)).toStrictEqual([]);
    });
    it('should be able to save to storage and read it back', function () {
        const test = [{name: "TEST",phone:"1234678",email:"test@email.com",id:1}];
        saveToStorage(test);
        expect(JSON.parse(localStorage.getItem("users")!)).toStrictEqual(test);
    });
});
describe("validateEmail",() => {
    it('should return true for valid email', function () {
        expect(validateEmail("test@example.com")).toBe(true);
    });
    it('should return false if the structure is wrong', function () {
        expect(validateEmail("@asd.com")).toBe(false);
        expect(validateEmail("asd@.com")).toBe(false);
        expect(validateEmail("asd@om")).toBe(false);
    });
});
describe("loadFromStorage", () => {
    it('should be able to load from JSON file', function () {
        localStorage.removeItem("users");
        expect(loadFromStorage()).toStrictEqual(JSONusers);
    });
    it('should be able to read from storage if it exists', function () {
        saveToStorage();
        expect(loadFromStorage()).toStrictEqual([]);
    });
    it('should load from JSON if the storage unparsable', function () {
        localStorage.setItem("users","45gfsdfgh");
        expect(loadFromStorage()).toStrictEqual(JSONusers);
    });
});
describe("getHash",() => {
    it('should be able to get hash and return an object', function () {
        setHash({users:2});
        expect(getHash()).toStrictEqual({users: "2"});
    });
});
describe("isObject", () => {
    it('should return true for object', function () {
        expect(isObject({})).toBe(true);
    });
    it('should return false for not objects', function () {
        expect(isObject("sdfs")).toBe(false);
        expect(isObject(1)).toBe(false);
        expect(isObject([])).toBe(false);
        expect(isObject(Symbol('123123'))).toBe(false);
    });
});


