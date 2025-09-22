import type {IsoDateTime} from "./bsdd-class.types.js";

/**
 * Representation of a ClassProperty — an instantiation of a general Property
 * for a particular Class (i.e. property settings as applied to a Class).
 *
 * Many fields are optional in the official spec; required/optional hints are in comments.
 * See bSDD Data structure (ClassProperty). :contentReference[oaicite:1]{index=1}
 */
export interface BSDDClassProperty {
    /** Code of the Property in the originating dictionary (required when delivering). */
    PropertyCode: string;

    /** Human readable name of the property (translatable). */
    PropertyName?: string;

    /** Full URI of the Property (if UseOwnUri=true or externally referenced). */
    PropertyUri?: string;

    /** Indicates in which Property Set this ClassProperty should appear for IFC (text). */
    PropertySet?: string;

    /** Example value for documentation (string in JSON spec). */
    Example?: string;

    /**
     * Units allowed for this property when relevant.
     * The docs use lists of unit codes (strings). Example: ["m","cm"].
     */
    UnitCodesList?: string[];

    /**
     * Allowed values (enumeration). The bSDD has an AllowedValue type (code, name, description).
     * Represented here as a minimal inline type; if you want the full AllowedValue model I can
     * add it explicitly.
     */
    AllowedValues?: Array<{
        Code?: string;
        Name?: string;
        Description?: string;
        Example?: string;
    }>;

    /** Minimum value (string per JSON spec). */
    MinValue?: string;

    /** Maximum value (string per JSON spec). */
    MaxValue?: string;

    /** True if Min is inclusive. */
    MinInclusive?: boolean;

    /** True if Max is inclusive. */
    MaxInclusive?: boolean;

    /**
     * Pattern (regex as string) that the value must match (if applicable).
     * NOTE: the spec stores these as strings in JSON.
     */
    Pattern?: string;

    /** Reference to other properties that parameterize a dynamic property (codes list). */
    DynamicParameterPropertyCodes?: string[];

    /** Codes of properties that are connected to this property (dependency/specialisation). */
    ConnectedPropertyCodes?: string[];

    /** Indicates the property is dynamic (value derived from other properties). */
    IsDynamic?: boolean;

    /** If the property is mandatory for the class when serialised to IFC or similar. */
    IsRequired?: boolean;

    /** Textual description/help (translatable). */
    Description?: string;

    /** Activation / deactivation dates (ISO strings). */
    ActivationDateUtc?: IsoDateTime;
    DeActivationDateUtc?: IsoDateTime;

    /** Revision and version metadata */
    RevisionDateUtc?: IsoDateTime;
    RevisionNumber?: number;
    VersionDateUtc?: IsoDateTime;
    VersionNumber?: number;

    /**
     * If you specified UseOwnUri = true at the dictionary level, you must supply the URI
     * that globally uniquely identifies the ClassProperty/Property instance.
     */
    OwnedUri?: string;

    /**
     * Additional free-form fields commonly present in API responses (e.g. PropertyType,
     * PropertyDataType, ValueType, ExampleNumeric, etc.). Keep until you want strict typing.
     */
    [extraField: string]: any;
}