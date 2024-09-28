export type ClassList = string | undefined | Record<string, boolean | undefined>;

export function classList(...lists: ClassList[]) {
    return lists.map(list => {
        if (typeof list === "string") {
            return list;
        }
        if (typeof list === "object") {
            return Object.keys(list).filter(prop => list[prop]).join(" ");
        }
        return "";
    }).join(" ");
}