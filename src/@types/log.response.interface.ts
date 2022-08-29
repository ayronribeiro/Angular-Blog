export interface AuditLog {
  /** UUID which can identify a group or unique log as an operation id.*/
  _id: string;
  /** The moment when the log was created. */
  createdAt: Date;
  /** The moment when the event was called. */
  requestedAt: Date;
  /** The momment when the event was finished. */
  finishedAt: Date;
  /** Defines what is the type of the event log. */
  logType: any;
  /** The aws function used to perform the event. */
  function: string;
  /** Contains the request information used in the lambda or http event. */
  request?: any;
  /** Contains the result of the requested lambda or http event. */
  result?: any;
  /** Contains the authentication and authorization information about the request. */
  identity: {
    sourceIp: string;
    userAgent: string;
    subject: string;
  };
}
