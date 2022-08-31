(() => ({
  name: 'TTF Data Count',
  icon: 'DataTable',
  category: 'DATA',
  keywords: ['Data', 'table', 'datatable', 'collection'],
  beforeCreate: ({
    components: {
      Content,
      Header,
      Field,
      Footer,
      ModelRelationSelector,
    },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');

    return (
      <>
        <Header title="Configure data table" onClose={close} />
        <Content>
          <Field label="Model">
            <ModelRelationSelector
              onChange={(value) => {
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
        </Content>
        <Footer
          onSave={() => {
            const newPrefab = { ...prefab };

            newPrefab.structure[0].options[0].value = modelId;

            save(newPrefab);
          }}
          onClose={close}
        />
      </>
    );
  },
  structure: [
    {
      name: 'DataCount',
      options: [
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL_AND_RELATION',
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Search on property',
          key: 'searchProperty',
          type: 'PROPERTY',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          value: 'built-in',
          label: 'Error message',
          key: 'showError',
          type: 'CUSTOM',
          configuration: {
            dependsOn: 'model',
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Built in', value: 'built-in' },
              { name: 'Interaction', value: 'interaction' },
            ],
          },
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['DataTable'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
