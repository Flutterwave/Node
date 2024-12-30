# Changelog
## 1.1.14 | 2024-12-13
Updated the `voucher` parameter in the momo schema.

### Version Changes
- [FIXED] Update the `voucher` parameter in the momo schema to be an optional parameter.

## 1.1.13 | 2024-11-19
Updated the `getBalanceByCurrency` method to parse path parameters.

### Version Changes
- [FIXED] Update the `balance_currency` function in the Misc object to exclude queries when parsing a path parameter.

## 1.1.12 | 2024-09-27
Update the list schema

### Version Changes
- [FIXED] Remove required validation on the 'account_bank" parameter.

## 1.1.11 | 2024-09-10
Update `account_bank` validation in create schema.

### Version Changes
- [FIXED] Update minLength & maxLength validation for account_bank parameter.

## 1.1.10 | 2024-04-04
Updated the variable name "package" which happens to be a reserved word in JavaScript, and it is causing compatibility issues with certain bundlers.

### Version Changes
- [FIXED] changed the variable name 'package' to 'packageJson' in the logger.js file.

## 1.1.9 | 2024-03-18
Validation hotfix on subaccounts

### Version Changes.
- [FIXED] Update validation (minLength & maxLength) for 'account_bank" parameter in the subaccountSchema.

## 1.1.8 | 2024-02-19
Updated BVN verification flow and hotfixes on subaccount, bills and transaction fees:

### Version Changes.
- [ADDED] New BVN verification flow (via NIBBS).
- [ADDED] Unit tests for more coverage on the BVN verification, fees, and split payments.
- [ADDED] Subaccounts parameter (optional) to card charge and PWBT requests.
- [FIXED] Resolved "URL Not Found" Error returned from Validate Bill Service method.
- [FIXED] Resolved "Invalid currency provided" Error returned from the Transaction fees method.

## 1.1.7 | 2024-01-25
Scheduled updates and bugfixes:

### Version Changes.
- [ADDED] Tanzania mobile money payment method.
- [ADDED] Fawry Pay payment method.
- [ADDED] Supplementary parameters in the createBulkTransferSchema.
- [ADDED] Expires parameter (optional) to PWBT (Pay with Bank Transfer) requests.
- [ADDED] Schema for USSD charge (ussdChargeSchema).
- [ADDED] Status parameter to the updatePlanSchema requests.
- [ADDED] Unit tests for more coverage on Fawry Pay, Google Pay, Apple Pay, and eNaira
- [ADDED] Unit tests for more coverage on payment plans, Charge NG Bank Account (Mono), Charge with Bank Transfer (PWBT), and Change UK & EU Bank Account.
- [FIXED] Optional parameters in beneficiarySchema.
- [FIXED] Updated transaction tests to stub response.
- [FIXED] Modified "id" in the fetchSchema to accept only integer values.
- [FIXED] Support string values for zip code in the cardChargeSchema.
- [FIXED] Support string values for "billing_zip" in the chargeSchema.
- [FIXED] Extended the length of "account_bank" values in the transferSchema.
- [FIXED] Updated the UK & USSD bank charge.
- [FIXED] Revised the NG bank charge (Mono).
- [REMOVED] Eliminated the "amount" parameter in the updatePlanSchema.

## 1.1.6 | 2023-06-21
Hotfix on Transfer fees and Bank lists.
### Version changes.
- [FIXED] Transfer fees returning 0 for all amounts.
- [FIXED] Null data response for Bank lists.

## 1.1.5 | 2023-04-13
Hotfix to hide header information in the library response.
### Version changes.
- [FIXED] Removed headers in the response.

## 1.1.4 | 2023-04-13
This release fixes the empty subscription fetch query with user email.
### Version changes.
- [FIXED] Empty data in response object for subscription fetch with email query parameter


## 1.1.3 | 2023-03-29
Scheduled updates and bug fixes. This release fixes all the bugs in the new SDK (v1.1.0)
### Version changes.
- [FIXED] Updated validation for empty meta objects in charge and transfer methods.
- [FIXED] Added conditional validation for `Country`, `Network`and `Voucher` parameters in Mobile Money schema.
- [FIXED] [#111](https://github.com/Flutterwave/Node/issues/111) Verify transaction error.
- [FIXED] Title validation in Card issuing schema.
- [FIXED] Import errors in Virtual account methods.
- [ADDED] Support for query parameters in listing methods.
- [REMOVED] Replaced `first_name` and `last_name` in the Card tokenization schema with a single `full_name`field.

## 1.1.1 | 2023-03-17
This release fixes all morx errors thrown in custom request class.
### Version changes.
- [FIXED] Morx error returned in custom service class in v1.1.0

## 1.1.0 | 2023-03-14
This release fixes all npm warnings and dependabot error messages.
### Version changes.
- [FIXED] [#103](https://github.com/Flutterwave/Node/issues/103)  Multiple Vulnerabilities Introduced by dependencies
- [FIXED] [#87](https://github.com/Flutterwave/Node/issues/87)  Amount is required for payment plan creation
- [FIXED] [#84](https://github.com/Flutterwave/Node/issues/84)  Cannot filter bills by category
- [FIXED] [#79](https://github.com/Flutterwave/Node/issues/79)  Urgent: Transactions GET endpoint or any endpoints with qs doesn't work
- [ADDED] Support for ApplePay, GooglePay and eNaira payments.

