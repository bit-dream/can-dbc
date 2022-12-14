import Dbc, { Attribute, Attributes, Message } from '../dbc/Dbc';
import dbcReader from '../filesystem/DbcReader';

test('DBC_template.dbc: Global attributes', (done) => {
  const dbc = new Dbc();
  const fileContent = dbcReader('src/__tests__/testFiles/DBC_template.dbc');
  const data = dbc.load(fileContent);
  const attributes: Attributes = new Map();
  const attribute: Attribute = {
    name: 'FloatAttribute',
    type: 'Global',
    dataType: 'FLOAT',
    options: null,
    defaultValue: '25.25',
    value: '45.9',
    min: 0,
    max: 50.5,
  };
  attributes.set('FloatAttribute', attribute);
  expect(data.attributes).toEqual(attributes);
  done();
});

test('DBC_template.dbc: Message attributes', (done) => {
  const dbc = new Dbc();
  const fileContent = dbcReader('src/__tests__/testFiles/DBC_template.dbc');
  const data = dbc.load(fileContent);
  const attributes: Attributes = new Map();
  const attribute: Attribute = {
    name: 'BOStringAttribute',
    type: 'Message',
    dataType: 'STRING',
    options: null,
    defaultValue: 'String',
    value: 'MessageAttribute',
    min: null,
    max: null,
  };
  attributes.set('BOStringAttribute', attribute);
  expect(data.messages.get('CANMessage')?.attributes).toEqual(attributes);
  done();
});

test('DBC_template.dbc: Signal attributes', (done) => {
  const dbc = new Dbc();
  const fileContent = dbcReader('src/__tests__/testFiles/DBC_template.dbc');
  const data = dbc.load(fileContent);
  const attributes: Attributes = new Map();
  const attribute: Attribute = {
    name: 'SGEnumAttribute',
    type: 'Signal',
    dataType: 'ENUM',
    options: ['Val0', 'Val1', 'Val2'],
    defaultValue: '1',
    value: '2',
    min: null,
    max: null,
  };
  attributes.set('SGEnumAttribute', attribute);
  expect(data.messages.get('CANMessage')?.signals.get('Signal0')?.attributes).toEqual(attributes);
  done();
});

test('attributes.dbc: Complex attribute parsing', (done) => {
  const dbc = new Dbc();
  const fileContent = dbcReader('src/__tests__/testFiles/attributes.dbc');
  const data = dbc.load(fileContent);
  expect(data.messages.size).toBe(16);

  // There should be a total of 14*2 total attributes for messages
  const totalMsgAttr = Array.from(data.messages.values()).reduce((prev: number, curr: Message): number => {
    return prev + curr.attributes.size;
  }, 0);
  expect(totalMsgAttr).toBe(14 * 2);

  done();
});
