"use client";

import { useMemo } from "react";
import { SelectableOption, SelectableOptionGroup } from "@/site/components/SelectableOptionGroup";
import { IncreaseFormStep } from "@/site/salary-increase-calculator/IncreaseFormStep";
import { EMPLOYMENT_PROFILES, type EmploymentProfile } from "@/site/salary-calculator";
import { calculatePersonalizedPas } from "./personnalise/engine";
import type {
  ChildrenCountOption,
  FamilySituation,
  PersonalizedPasResult,
} from "./personnalise/types";
import {
  PersonIncomeFields,
  createEmptyPersonIncomeState,
  personHasIncome,
  resyncPersonIncomeAfterProfileChange,
  toPersonIncomeInput,
  type PersonIncomeState,
} from "./PersonIncomeFields";
import { needsSpouse } from "./family";

export { needsSpouse } from "./family";

const FAMILY_OPTIONS: { id: FamilySituation; label: string }[] = [
  { id: "single", label: "Célibataire" },
  { id: "married", label: "Marié" },
  { id: "pacs", label: "Pacsé" },
  { id: "divorced", label: "Divorcé" },
];

const CHILDREN_OPTIONS: { value: ChildrenCountOption; label: string }[] = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7+" },
];

export interface PasPersonalizedFormProps {
  situation: FamilySituation;
  childrenCount: ChildrenCountOption;
  declarant: PersonIncomeState;
  spouse: PersonIncomeState;
  onSituationChange: (situation: FamilySituation) => void;
  onChildrenChange: (children: ChildrenCountOption) => void;
  onDeclarantChange: (next: PersonIncomeState) => void;
  onSpouseChange: (next: PersonIncomeState) => void;
}

export function usePersonalizedPasComputation(
  situation: FamilySituation,
  childrenCount: ChildrenCountOption,
  declarant: PersonIncomeState,
  spouse: PersonIncomeState,
): {
  result: PersonalizedPasResult | null;
  hasIncome: boolean;
  validationError: string | null;
} {
  const showSpouse = needsSpouse(situation);

  const declarantReady = personHasIncome(declarant);
  const hasIncome = declarantReady && (!showSpouse || personHasIncome(spouse));

  const validationError = useMemo(() => {
    if (!declarantReady) return null;
    if (showSpouse && !personHasIncome(spouse)) {
      return "Indiquez les revenus du conjoint pour estimer le taux personnalisé.";
    }
    return null;
  }, [declarantReady, showSpouse, spouse]);

  const result = useMemo(() => {
    if (!hasIncome || validationError) return null;
    return calculatePersonalizedPas({
      situation,
      children: childrenCount,
      declarant: toPersonIncomeInput(declarant),
      spouse: showSpouse ? toPersonIncomeInput(spouse) : null,
    });
  }, [childrenCount, declarant, hasIncome, showSpouse, situation, spouse, validationError]);

  return { result, hasIncome: declarantReady, validationError };
}

function ProfileStep({
  stepNumber,
  title,
  name,
  profile,
  onProfileChange,
}: {
  stepNumber: number;
  title: string;
  name: string;
  profile: EmploymentProfile;
  onProfileChange: (profile: EmploymentProfile) => void;
}) {
  return (
    <IncreaseFormStep step={stepNumber} title={title} essential>
      <SelectableOptionGroup legend="Statut professionnel" ariaLabel={title}>
        {EMPLOYMENT_PROFILES.map((item) => (
          <SelectableOption
            key={item.id}
            name={name}
            value={item.id}
            label={item.label}
            checked={profile === item.id}
            onChange={() => onProfileChange(item.id)}
          />
        ))}
      </SelectableOptionGroup>
    </IncreaseFormStep>
  );
}

export function PasPersonalizedForm({
  situation,
  childrenCount,
  declarant,
  spouse,
  onSituationChange,
  onChildrenChange,
  onDeclarantChange,
  onSpouseChange,
}: PasPersonalizedFormProps) {
  const showSpouse = needsSpouse(situation);

  return (
    <ol className="increase-calc__steps">
      <IncreaseFormStep step={1} title="Situation familiale" essential>
        <SelectableOptionGroup legend="Situation familiale" ariaLabel="Situation familiale">
          {FAMILY_OPTIONS.map((option) => (
            <SelectableOption
              key={option.id}
              name="pasFamilySituation"
              value={option.id}
              label={option.label}
              checked={situation === option.id}
              onChange={() => {
                onSituationChange(option.id);
                if (!needsSpouse(option.id)) {
                  onSpouseChange(createEmptyPersonIncomeState());
                }
              }}
            />
          ))}
        </SelectableOptionGroup>
      </IncreaseFormStep>

      <IncreaseFormStep step={2} title="Nombre d'enfants à charge" essential>
        <SelectableOptionGroup
          legend="Enfants à charge"
          ariaLabel="Nombre d'enfants à charge"
          compact
        >
          {CHILDREN_OPTIONS.map((option) => (
            <SelectableOption
              key={option.value}
              name="pasChildrenCount"
              value={String(option.value)}
              label={option.label}
              checked={childrenCount === option.value}
              onChange={() => onChildrenChange(option.value)}
              compact
            />
          ))}
        </SelectableOptionGroup>
      </IncreaseFormStep>

      <ProfileStep
        stepNumber={3}
        title="Statut professionnel du déclarant"
        name="pasDeclarantProfile"
        profile={declarant.profile}
        onProfileChange={(profile) =>
          onDeclarantChange(resyncPersonIncomeAfterProfileChange(declarant, profile))
        }
      />

      <PersonIncomeFields
        idPrefix="pasDeclarant"
        title="Revenus du déclarant"
        stepNumber={4}
        state={declarant}
        onChange={onDeclarantChange}
      />

      {showSpouse ? (
        <>
          <ProfileStep
            stepNumber={5}
            title="Statut professionnel du conjoint"
            name="pasSpouseProfile"
            profile={spouse.profile}
            onProfileChange={(profile) =>
              onSpouseChange(resyncPersonIncomeAfterProfileChange(spouse, profile))
            }
          />

          <PersonIncomeFields
            idPrefix="pasSpouse"
            title="Revenus du conjoint"
            stepNumber={6}
            state={spouse}
            onChange={onSpouseChange}
          />
        </>
      ) : null}
    </ol>
  );
}
