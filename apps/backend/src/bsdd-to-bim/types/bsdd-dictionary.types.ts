import type {BSDDClass, IsoDateTime} from "./bsdd-class.types.js";
import type {BSDDProperty} from "./bsdd-property.types.js";

/**
 * The allowed status values for a Dictionary in bSDD.
 */
export type BsddDictionaryStatus = "Preview" | "Active" | "Inactive";

/**
 * Representation of a bSDD Dictionary’s metadata as specified in the Data Structure.
 */
export interface BSDDDictionaryMetadata {
    /** Code of the organisation owning this dictionary. Must be registered in bSDD. Required. */
    OrganizationCode: string;

    /** Code of the dictionary (short, URI‐friendly). Required. */
    DictionaryCode: string;

    /**
     * Name of the dictionary.
     * Required when dictionary is new; optional if already exists.
     */
    DictionaryName?: string;

    /** Version of the dictionary’s data. Required. Format: up to 3 dot-separated numbers (e.g. “1.0.1”). */
    DictionaryVersion: string;

    /** ISO language code for the content (e.g. “en-US”, “de-DE”). Required. */
    LanguageIsoCode: string;

    /**
     * List of IFC entity class names that this dictionary is relating to or extending (optional).
     * Helps tools filter by IFC schema entities.
     */
    RelatedIfcEntityNamesList?: string[];

    /**
     * Whether we use our own URIs for Classes & Properties etc. Default is false.
     */
    UseOwnUri?: boolean;

    /**
     * Required if UseOwnUri = true: the base URI used by this dictionary.
     * Example: "urn:mycompany:mydictionary" or perhaps an HTTP(s) base.
     */
    DictionaryUri?: string;

    /** License identifier text (e.g. “MIT”, “CC-BY-4.0”). Optional. */
    License?: string;

    /** URL linking to license text (if any). Optional. */
    LicenseUrl?: string;

    /** Email address to receive change requests. Optional. */
    ChangeRequestEmailAddress?: string;

    /** Version of the JSON/Import template used. Optional. */
    ModelVersion?: string;

    /** URL for more general information about the dictionary. Optional. */
    MoreInfoUrl?: string;

    /** Name of quality assurance procedure, if any. Optional. */
    QualityAssuranceProcedure?: string;

    /** URL of detail for QA procedure. Optional. */
    QualityAssuranceProcedureUrl?: string;

    /** Release date/time (ISO format), if known. Optional. */
    ReleaseDate?: IsoDateTime;

    /** Status of the dictionary (Preview, Active, Inactive). Optional. */
    Status?: BsddDictionaryStatus;

    /** If true, this JSON payload is only for language / translations, contains no other fields. Optional; default false. */
    LanguageOnly?: boolean;

    Classes?: BSDDClass[];
    Properties?: BSDDProperty[];

    /**
     * Additional free-form fields may appear in API responses or imports.
     * Remove this if you want strictly only defined fields.
     */
    [extraField: string]: any;
}