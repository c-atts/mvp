import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CanisterSettingsInput {
  'ecdsa_key_id' : string,
  'siwe_provider_canister' : string,
  'evm_rpc_canister' : string,
}
export interface Error {
  'code' : number,
  'message' : string,
  'details' : [] | [string],
}
export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponse {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface LogItem {
  'level' : LogLevel,
  'message' : string,
  'timestamp' : bigint,
}
export type LogLevel = { 'Error' : null } |
  { 'Info' : null } |
  { 'Warn' : null } |
  { 'Debug' : null };
export type PaymentVerifiedStatus = { 'VerificationFailed' : null } |
  { 'Verified' : null } |
  { 'Pending' : null };
export interface Recipe {
  'id' : Uint8Array | number[],
  'gas' : [] | [bigint],
  'resolver' : string,
  'created' : bigint,
  'creator' : Uint8Array | number[],
  'schema' : string,
  'name' : string,
  'description' : [] | [string],
  'display_name' : [] | [string],
  'keywords' : [] | [Array<string>],
  'queries' : Array<RecipeQuery>,
  'publish_state' : RecipePublishState,
  'processor' : string,
  'revokable' : boolean,
}
export interface RecipeDetailsInput {
  'resolver' : string,
  'schema' : string,
  'name' : string,
  'description' : [] | [string],
  'display_name' : [] | [string],
  'keywords' : [] | [Array<string>],
  'queries' : Array<RecipeQuery>,
  'processor' : string,
  'revokable' : boolean,
}
export type RecipePublishState = { 'Draft' : null } |
  { 'Unpublished' : null } |
  { 'Published' : null };
export interface RecipeQuery {
  'endpoint' : string,
  'query' : string,
  'variables' : string,
}
export type Result = { 'Ok' : string } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : Recipe } |
  { 'Err' : Error };
export type Result_2 = { 'Ok' : Array<Recipe> } |
  { 'Err' : string };
export type Result_3 = { 'Ok' : Run } |
  { 'Err' : Error };
export type Result_4 = { 'Ok' : Array<Run> } |
  { 'Err' : Error };
export type Result_5 = { 'Ok' : User } |
  { 'Err' : Error };
export interface Run {
  'id' : Uint8Array | number[],
  'fee' : bigint,
  'created' : bigint,
  'creator' : Uint8Array | number[],
  'attestation_uid' : [] | [string],
  'attestation_transaction_hash' : [] | [string],
  'recipe_id' : Uint8Array | number[],
  'is_cancelled' : boolean,
  'chain_id' : bigint,
  'attestation_create_error' : [] | [string],
  'payment_verified_status' : [] | [PaymentVerifiedStatus],
  'payment_transaction_hash' : [] | [string],
}
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponse,
}
export interface User { 'eth_address' : string }
export interface _SERVICE {
  'canister_eth_address' : ActorMethod<[], Result>,
  'logs' : ActorMethod<[], Array<LogItem>>,
  'recipe_create' : ActorMethod<[RecipeDetailsInput, string], Result_1>,
  'recipe_get_by_id' : ActorMethod<[Uint8Array | number[]], Result_1>,
  'recipe_get_by_name' : ActorMethod<[string], Result_1>,
  'recipe_list' : ActorMethod<[], Result_2>,
  'recipe_publish' : ActorMethod<[Uint8Array | number[]], Result_1>,
  'run_cancel' : ActorMethod<[Uint8Array | number[]], Result_3>,
  'run_create' : ActorMethod<[Uint8Array | number[], bigint], Result_3>,
  'run_get' : ActorMethod<[Uint8Array | number[]], Result_3>,
  'run_list_for_user' : ActorMethod<[], Result_4>,
  'run_register_payment' : ActorMethod<
    [Uint8Array | number[], string, bigint],
    Result_3
  >,
  'transform' : ActorMethod<[TransformArgs], HttpResponse>,
  'user_create' : ActorMethod<[], Result_5>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];