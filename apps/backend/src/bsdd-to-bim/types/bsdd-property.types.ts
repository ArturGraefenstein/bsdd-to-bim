import type {BSDDReal} from "./bsdd-real.types.js";
import type {BSDDPropertyRelation} from "./bsdd-property-relation.types.js";
import type {BSDDAllowedValue} from "./bsdd-allowed-value.types.js";

export type BSSDProperty = {
    Code: string;
    Name: string;
    Definition?: string;
    Description?: string;
    DataType: string;
    Units?: string[];
    Example?: string;
    ActivationDateUtc?: Date;
    ConnectedPropertyCodes?: string[];
    CountriesOfUse?: string[];
    CountryOfOrigin?: string;
    CreatorLanguageIsoCode?: string;
    DeActivationDateUtc?: Date;
    DeprecationExplanation: string;

    Dimension?: string;
    DimensionLength?: number;
    DimensionMass?: number;
    DimensionTime?: number;
    DimensionElectricCurrent?: number;
    DimensionThermodynamicTemperature?: number;
    DimensionAmountOfSubstance?: number;
    DimensionLuminousIntensity?: number;

    DocumentReference?: string;
    DynamicParameterPropertyCodes?: string[];
    IsDynamic?: boolean;

    MaxExclusive?: BSDDReal;
    MaxInclusive?: BSDDReal;
    MinExclusive?: BSDDReal;
    MinInclusive?: BSDDReal;

    MethodOfMeasurement?: string;
    OwnedUri?: string;
    Pattern?: string;
    PhysicalQuantity?: string;
    PropertyValueKind?: string;
    ReplacedObjectCodes?: string[];
    ReplacingObjectCodes?: string[];
    RevisionDateUtc?: Date;
    RevisionNumber?: number;
    Status?: string;
    SubdivisionsOfUse?: string[];
    TextFormat?: string;
    Uid?: string;
    VersionDateUtc?: Date;
    VersionNumber?: string;
    VisualRepresentationUri?: string;
    PropertyRelations?: BSDDPropertyRelation[]
    AllowedValues?: BSDDAllowedValue[];

}