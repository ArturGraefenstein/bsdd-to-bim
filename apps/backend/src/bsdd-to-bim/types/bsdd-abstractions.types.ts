type Real = unknown;
type PropertyRelation = unknown;
type AllowedValue = unknown;
export type BSDDClassAbstraction = {}
export type BSSDPropertyAbstraction = {
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

    MaxExclusive?: Real;
    MaxInclusive?: Real;
    MinExclusive?: Real;
    MinInclusive?: Real;

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
    PropertyRelations?: PropertyRelation[]
    AllowedValues?: AllowedValue[];

}
export type BSSDJsonAbstraction = {
    Classes: BSDDClassAbstraction[],
    Properties: BSSDPropertyAbstraction[],
}