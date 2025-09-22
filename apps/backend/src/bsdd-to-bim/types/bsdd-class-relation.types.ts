import type {IsoDateTime} from "./bsdd-class.types.js";
import type {BSDDRelationType} from "./bsdd-relation-type.types.js";

/**
 * ClassRelation links a Class (owner) to another Class (possibly in another dictionary).
 * Typical relation types: IsEqualTo, IsSimilarTo, HasReference, HasPart, IsChildOf, HasMaterial, ...
 * See bSDD Data structure (ClassRelation). :contentReference[oaicite:2]{index=2}
 */
export interface BSDDClassRelation {
    /** Name of the related Class (text, optional but helpful). */
    RelatedClassName?: string;

    /**
     * Full URI of the related Class (required for cross-dictionary relations).
     * If the relation points within the same dictionary you can also use the Code.
     */
    RelatedClassUri?: string;

    /**
     * Code of the related Class (within same dictionary). Use either Code or Uri.
     * Example: "ifc-00123-00"
     */
    RelatedClassCode?: string;

    /** Relation type (see BsddRelationType). Required in many contexts. */
    RelationType: BSDDRelationType;

    /**
     * Fraction (real) — only applicable to HasMaterial relations (optional).
     * The docs say sum of fractions per class/relationtype must be 1 when used.
     */
    Fraction?: number;

    /** If you specified UseOwnUri = true at the dictionary level, supply unique URI for the relation. */
    OwnedUri?: string;

    /** Optional text / reason describing the relation (translatable). */
    Description?: string;

    /** Activation / deactivation dates (ISO strings). */
    ActivationDateUtc?: IsoDateTime;
    DeActivationDateUtc?: IsoDateTime;

    /** Revision and version metadata */
    RevisionDateUtc?: IsoDateTime;
    RevisionNumber?: number;
    VersionDateUtc?: IsoDateTime;
    VersionNumber?: number;

    [extraField: string]: any;
}