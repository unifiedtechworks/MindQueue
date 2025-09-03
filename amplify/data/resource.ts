import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

export const schema = a.schema({
  Ticket: a.model({
  title: a.string(),
  description: a.string(),
  status: a.string(),
  createdAt: a.timestamp(),
  createdBy: a.string(),
  chatters: a.hasMany('Chatter', ['ticketId']), // ✅ matches the FK
  priority: a.string(), 
  dueDate: a.string(),  
}).authorization((allow) => [allow.guest()]),


Chatter: a.model({
  id: a.id(),
  message: a.string(),
  createdAt: a.timestamp(),
  createdBy: a.string(),
  ticketId: a.id(), // 👈 explicitly define the FK field
  ticket: a.belongsTo('Ticket', ['ticketId']), // 👈 link via that FK field
}).authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});
