/** Relation types allowed between Classes (and also between Properties) in bSDD. */
export type BSDDRelationType =
    | "IsEqualTo"
    | "IsSimilarTo"
    | "HasReference"
    | "IsChildOf"
    | "IsParentOf"
    | "HasPart"
    | "IsPartOf"
    | "HasMaterial";
// Note: deprecated / legacy types like "IsSynonymOf" may appear but are not recommended.