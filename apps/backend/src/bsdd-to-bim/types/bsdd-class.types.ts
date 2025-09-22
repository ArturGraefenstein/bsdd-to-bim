import type { BSDDClassProperty } from "./bsdd-class-property.types.js";
import type { BSDDClassRelation } from "./bsdd-class-relation.types.js";
import type {BSDDProperty} from "./bsdd-property.types.js";

/**
 * Allowed class types according to the documentation.
 * Note: documentation mentions other deprecated types may appear in API results.
 */
export type BSDDClassType =
    | "Class"
    | "Material"
    | "GroupOfProperties"
    | "AlternativeUse"
    // deprecated types may still appear in API responses:
    | "ReferenceDocument"
    | "ComposedProperty"
    | "Dictionary";

/**
 * Common ISO-style datetime strings used in the JSON (e.g. "2020-01-01T00:00:00Z").
 */
export type IsoDateTime = string;

/**
 * A bSDD "Class" (renamed to BsddClass to avoid keyword collision).
 * Fields marked with `// required` reflect the documentation's required flag.
 * Many fields are optional; if present, their types follow the spec.
 */
export interface BSDDClass {
    /** Unique identification of the class within the dictionary. Example: "abc-00123-01". (required) */
    Code: string;

    /** Name of the Class. (required) */
    Name: string;

    /**
     * One of allowed class types. If omitted in the JSON, "Class" is used by default.
     * The docs mark it required (with asterisk meaning default applies) — keep required in model.
     */
    ClassType: BSDDClassType;

    /** Definition of the Class (required). Supports cross-reference markup in doc. */
    Definition: string;

    /** Supplementary explanation; use only when needed. */
    Description?: string;

    /** Reference to the parent Class's Code. Must exist in same payload if used. */
    ParentClassCode?: string;

    /**
     * List of IFC entity names used as representations of this Class.
     * Example: ['IfcWall'].
     */
    RelatedIfcEntityNamesList?: string[];

    /** List of synonyms for easier finding. */
    Synonyms?: string[];

    /** Activation date in UTC (ISO string). */
    ActivationDateUtc?: IsoDateTime;

    /** Reference code; if null the 'Code' is used by import. Use empty string to force empty. */
    ReferenceCode?: string;

    /** Countries where this class is used (ISO country codes). */
    CountriesOfUse?: string[];

    /** Country of origin (ISO country code). */
    CountryOfOrigin?: string;

    /** Creator language ISO code (e.g. 'en-US'). */
    CreatorLanguageIsoCode?: string;

    /** Deactivation date in UTC (ISO string). */
    DeActivationDateUtc?: IsoDateTime;

    /** Only fill for deprecated definitions. */
    DeprecationExplanation?: string;

    /** Document reference code (see reference documents list). */
    DocumentReference?: string;

    /** If the dictionary used its own URIs, this is the owned URI for the Class. */
    OwnedUri?: string;

    /** List of class codes this class replaces. */
    ReplacedObjectCodes?: string[];

    /** List of class codes replacing this class. */
    ReplacingObjectCodes?: string[];

    /** Revision date in UTC (ISO string). */
    RevisionDateUtc?: IsoDateTime;

    /** Revision number (integer). */
    RevisionNumber?: number;

    /** Status: typically "Active" or "Inactive". */
    Status?: string;

    /** Subdivisions / geographical regions of use (e.g. "US-MT"). */
    SubdivisionsOfUse?: string[];

    /** Unique ID (in case URI is not enough). */
    Uid?: string;

    /** Version date in UTC (ISO string). */
    VersionDateUtc?: IsoDateTime;

    /** Version number (integer). */
    VersionNumber?: number;

    /** URI to visual representation (image). */
    VisualRepresentationUri?: string;

    ClassProperties?: BSDDClassProperty[]
    ClassRelations?: BSDDClassRelation[];
    /**
     * Additional fields that sometimes appear in API responses but are not present
     * in the minimal class section definition can be allowed with an index signature.
     * Remove or restrict if you prefer stricter typing.
     */
    [extraField: string]: any;
}

/**
 * Minimal "Dictionary" type from the same section.
 * Several fields are required when uploading; keep what is commonly needed.
 */
export interface BSDDDictionary {
    /** The organisation’s code as registered in bSDD. (required) */
    OrganizationCode: string;

    /** Code of the dictionary (required). */
    DictionaryCode: string;

    /** Name of the dictionary. If dictionary exists, supplying name is not necessary. (required) */
    DictionaryName?: string;

    /** Version of the dictionary data. Format: up to 3 dot-separated numbers. (required) */
    DictionaryVersion: string;

    /** ISO language code for the JSON data. Example: "de-DE". (required) */
    LanguageIsoCode: string;

    /**
     * true if JSON contains only language-specific information (no other fields).
     * Default is false.
     */
    LanguageOnly?: boolean;

    /**
     * Default: false. If true, use your own URIs for Classes & Properties.
     * In that case DictionaryUri must also be supplied.
     */
    UseOwnUri?: boolean;

    /** Required if UseOwnUri = true. Example: "urn:mycompany:mydictionary" */
    DictionaryUri?: string;

    /** License identifier text (e.g. "MIT", "CC-BY-4.0"). */
    License?: string;

    /** Link to license text. */
    LicenseUrl?: string;

    /** Single email address for receiving change requests. */
    ChangeRequestEmailAddress?: string;

    /** Version of the JSON input template (optional). */
    ModelVersion?: string;

    /** URL with more info about the dictionary. */
    MoreInfoUrl?: string;

    /** Quality assurance procedure name (optional). */
    QualityAssuranceProcedure?: string;

    /** URL with QA procedure details (optional). */
    QualityAssuranceProcedureUrl?: string;

    /** Release date/time (ISO). */
    ReleaseDate?: IsoDateTime;

    /**
     * One of "Preview" | "Active" | "Inactive" (status of the dictionary).
     * New uploads should be "Preview" according to docs.
     */
    Status?: "Preview" | "Active" | "Inactive";

    /** The classes contained in the dictionary. (required when delivering classes) */
    Classes?: BSDDClass[];

    /** The properties contained in the dictionary (not modeled here). */
    Properties?: BSDDProperty[];

    [extraField: string]: any;
}