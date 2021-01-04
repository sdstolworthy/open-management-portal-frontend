import React from 'react';
import {
  FormGroup,
  FormSelect,
  FormSelectOption,
} from '@patternfly/react-core';
import { useFeatures } from '../../context/feature_context/feature_hook';
import { APP_FEATURES } from '../../common/app_features';
import { HostingEnvironment } from '../../schemas/hosting_environment';

interface CloudProviderRegionFormFieldProps {
  availableProviderRegionOptions: { label: string; value: string }[];
  hostingEnvironment: HostingEnvironment;
  onChange: (fieldName: string, value: any) => void;
}

export function CloudProviderRegionFormField({
  availableProviderRegionOptions,
  hostingEnvironment,
  onChange,
}: CloudProviderRegionFormFieldProps) {
  const { hasFeature } = useFeatures();
  return (
    <FormGroup
      label="Provider Region"
      isRequired
      fieldId="cloud-provider-region"
    >
      <FormSelect
        data-testid="provider-region-select"
        aria-label="Cloud provider region"
        id={'cloud_provider_region_dropdown'}
        isDisabled={
          availableProviderRegionOptions?.length === 0 ||
          !hasFeature(APP_FEATURES.writer)
        }
        readOnly={availableProviderRegionOptions?.length === 0}
        value={hostingEnvironment?.ocp_cloud_provider_region || ''}
        onChange={onChange}
      >
        {[
          <FormSelectOption label={'Select a region'} value={undefined} />,
        ].concat(
          availableProviderRegionOptions.map((option: any, index: any) => (
            <FormSelectOption
              isDisabled={option.disabled || !hasFeature(APP_FEATURES.writer)}
              key={index}
              value={option.value}
              label={option.label}
              data-cy={option.value}
            />
          ))
        )}
      </FormSelect>
    </FormGroup>
  );
}
