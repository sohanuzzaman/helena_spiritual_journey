# Localization Manager API (UILM v1)

> **Base URL:** `https://api.seliseblocks.com/uilm/v1`
> **Version:** v1
> **OpenAPI:** 3.0.4

Provides APIs for managing application localization and translations. Supports creating and editing translation keys by module, adding or removing languages, and auto-translating default values. Includes options for publishing changes, retrieving module-based values, and restoring keys when a deleted language is re-added.

---

## Authentication

All endpoints require one of the following:

| Method | Details |
|---|---|
| **Bearer Token** | `Authorization: Bearer <JWT_TOKEN>` |
| **API Key** | Header: `x-blocks-key: <API_KEY>` |

---

## Endpoints

### Assistant

#### `POST /Assistant/GetTranslationSuggestion`
Gets an AI-powered translation suggestion for a UI element.

**Request Body: `SuggestLanguageRequest`**
```json
{
  "elementType": "string",
  "elementApplicationContext": "string",
  "elementDetailContext": "string",
  "temperature": 0.7,
  "maxCharacterLength": 100,
  "sourceText": "Welcome",
  "destinationLanguage": "de",
  "currentLanguage": "en"
}
```

**Response:** `200 OK`

---

### Config

#### `POST /Config/SaveWebHook`
Registers or updates a webhook to receive localization event notifications.

**Request Body: `BlocksWebhook`**
```json
{
  "url": "https://your-app.com/webhook",
  "contentType": "application/json",
  "isDisabled": false,
  "projectKey": "your-project-key",
  "blocksWebhookSecret": {
    "secret": "your-secret-value",
    "headerKey": "x-webhook-secret"
  }
}
```

**Response:** `200 OK` → `ApiResponse`

---

### Key

The core of the API — manages all translation keys and their values across languages.

---

#### `POST /Key/Save`
Creates a new key or updates an existing one. Omit `itemId` to create; include it to update.

**Request Body: `Key`**
```json
{
  "itemId": "optional-for-update",
  "keyName": "welcome_message",
  "moduleId": "your-module-id",
  "projectKey": "your-project-key",
  "context": "Homepage greeting text",
  "shouldPublish": true,
  "routes": ["/home", "/dashboard"],
  "resources": [
    { "culture": "en", "value": "Welcome" },
    { "culture": "de", "value": "Willkommen" },
    { "culture": "fr", "value": "Bienvenue" }
  ]
}
```

**Response:** `200 OK` → `ApiResponse`

**cURL Example:**
```bash
curl -X POST "https://api.seliseblocks.com/uilm/v1/Key/Save" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "keyName": "welcome_message",
    "moduleId": "your-module-id",
    "projectKey": "your-project-key",
    "resources": [
      { "culture": "en", "value": "Welcome" },
      { "culture": "de", "value": "Willkommen" }
    ]
  }'
```

---

#### `POST /Key/SaveKeys`
Batch creates or updates multiple keys in a single operation.

**Request Body:** Array of `Key` objects (same schema as `/Key/Save`)

```json
[
  { "keyName": "key_one", "moduleId": "...", "projectKey": "...", "resources": [...] },
  { "keyName": "key_two", "moduleId": "...", "projectKey": "...", "resources": [...] }
]
```

**Response:** `200 OK` → `ApiResponse`

---

#### `POST /Key/Gets`
Retrieves a paginated, filterable list of keys.

**Request Body: `GetKeysRequest`**
```json
{
  "pageSize": 50,
  "pageNumber": 1,
  "projectKey": "your-project-key",
  "keySearchText": "welcome",
  "moduleIds": ["module-id-1", "module-id-2"],
  "isPartiallyTranslated": false,
  "sortProperty": "keyName",
  "isDescending": false,
  "createDateRange": {
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T23:59:59Z"
  }
}
```

**Response:** `200 OK` → `GetKeysQueryResponse`
```json
{
  "totalCount": 120,
  "keys": [ /* array of Key objects */ ]
}
```

**cURL Example:**
```bash
curl -X POST "https://api.seliseblocks.com/uilm/v1/Key/Gets" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pageSize": 50,
    "pageNumber": 1,
    "projectKey": "your-project-key"
  }'
```

---

#### `GET /Key/Get`
Retrieves a single key by its ID.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `ItemId` | string | The key's unique identifier |
| `ProjectKey` | string | The project identifier |

**Response:** `200 OK` → `Key`

**cURL Example:**
```bash
curl "https://api.seliseblocks.com/uilm/v1/Key/Get?ItemId=KEY_ID&ProjectKey=your-project-key" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

#### `DELETE /Key/Delete`
Deletes a specific key by ID.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `ItemId` | string | The key's unique identifier |
| `ProjectKey` | string | The project identifier |

**Response:** `200 OK`

**cURL Example:**
```bash
curl -X DELETE "https://api.seliseblocks.com/uilm/v1/Key/Delete?ItemId=KEY_ID&ProjectKey=your-project-key" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

#### `GET /Key/GetTimeline`
Retrieves the change history (audit log) of a key with pagination.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `PageSize` | int | Number of records per page |
| `PageNumber` | int | Page number |
| `EntityId` | string | The key entity ID |
| `UserId` | string | Filter by user who made the change |
| `CreateDateRange.StartDate` | datetime | Start of date range filter |
| `CreateDateRange.EndDate` | datetime | End of date range filter |
| `SortProperty` | string | Field to sort by |
| `IsDescending` | boolean | Sort direction |
| `ProjectKey` | string | The project identifier |

**Response:** `200 OK` → `GetKeyTimelineQueryResponse`
```json
{
  "totalCount": 10,
  "timelines": [
    {
      "itemId": "...",
      "entityId": "...",
      "createDate": "2024-06-01T10:00:00Z",
      "userId": "...",
      "userName": "John Doe",
      "logFrom": "...",
      "rollbackFrom": "...",
      "currentData": { /* BlocksLanguageKey */ },
      "previousData": { /* BlocksLanguageKey */ }
    }
  ]
}
```

---

#### `POST /Key/RollBack`
Reverts a key to its previous state.

**Request Body: `RollbackRequest`**
```json
{
  "itemId": "timeline-item-id",
  "projectKey": "your-project-key"
}
```

**Response:** `200 OK`

---

#### `POST /Key/GenerateUilmFile`
Generates a UILM file for download. **Must be called before `/Key/GetUilmFile`.**

**Request Body: `GenerateUilmFilesRequest`**
```json
{
  "guid": "optional-guid",
  "moduleId": "your-module-id",
  "projectKey": "your-project-key"
}
```

**Response:** `200 OK`

---

#### `GET /Key/GetUilmFile`
Downloads the generated UILM JSON file for a specific module and language. Call `/Key/GenerateUilmFile` first.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `Language` | string | Language code (e.g. `en`, `de`) |
| `ModuleName` | string | The module name |
| `ProjectKey` | string | The project identifier |

**Response:** `200 OK` → JSON file

---

#### `POST /Key/TranslateAll`
Auto-translates all keys that have no value. Optionally scoped to a specific module.

**Request Body: `TranslateAllRequest`**
```json
{
  "moduleId": "optional-module-id",
  "messageCoRelationId": "correlation-id",
  "projectKey": "your-project-key",
  "defaultLanguage": "en"
}
```

**Response:** `200 OK`

---

#### `POST /Key/TranslateKey`
Queues a specific key for auto-translation.

**Request Body: `TranslateBlocksLanguageKeyRequest`** *(all fields required)*
```json
{
  "keyId": "the-key-id",
  "messageCoRelationId": "correlation-id",
  "projectKey": "your-project-key",
  "defaultLanguage": "en"
}
```

**Response:** `200 OK`

---

#### `POST /Key/UilmImport`
Imports a UILM file. Existing keys are updated, new keys are added, removed keys are ignored, and existing modules are not replaced.

**Request Body: `UilmImportRequest`**
```json
{
  "fileId": "uploaded-file-id",
  "messageCoRelationId": "correlation-id",
  "projectKey": "your-project-key"
}
```

**Response:** `200 OK`

---

#### `POST /Key/UilmExport`
Exports all or selected modules with their keys.

**Request Body: `UilmExportRequest`**
```json
{
  "outputType": 0,
  "projectKey": "your-project-key",
  "appIds": ["module-id-1", "module-id-2"],
  "languages": ["en", "de", "fr"],
  "messageCoRelationId": "correlation-id",
  "referenceFileId": "optional-reference-id",
  "callerTenantId": "optional-tenant-id",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-12-31T23:59:59Z"
}
```

**Output Types (`OutputType` enum):**

| Value | Description |
|---|---|
| `0` | Default |
| `1` | Type 1 |
| `2` | Type 2 |
| `3` | Type 3 |
| `4` | Type 4 |
| `5` | Type 5 |

**Response:** `200 OK`

---

#### `GET /Key/GetUilmExportedFiles`
Gets a paginated list of previously exported UILM files.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `PageSize` | int | Number of records per page |
| `PageNumber` | int | Page number |
| `ProjectKey` | string | The project identifier |
| `SearchText` | string | Filter by filename |
| `CreateDateRange.StartDate` | datetime | Start of date range filter |
| `CreateDateRange.EndDate` | datetime | End of date range filter |

**Response:** `200 OK`

---

#### `GET /Key/GetLanguageFileGenerationHistory`
Gets a paginated history of language file generation runs.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `PageSize` | int | Number of records per page |
| `PageNumber` | int | Page number |
| `ProjectKey` | string | The project identifier |

**Response:** `200 OK`

---

### Language

#### `POST /Language/Save`
Creates or updates a language.

**Request Body: `Language`**
```json
{
  "itemId": "optional-for-update",
  "languageName": "German",
  "languageCode": "de",
  "isDefault": false,
  "projectKey": "your-project-key"
}
```

**Response:** `200 OK` → `ApiResponse`

---

#### `GET /Language/Gets`
Retrieves all languages configured for a project.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `ProjectKey` | string | The project identifier |

**Response:** `200 OK` → Array of `Language`

---

#### `DELETE /Language/Delete`
Deletes a language by name.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `LanguageName` | string | The language name to delete |
| `ProjectKey` | string | The project identifier |

**Response:** `200 OK`

---

#### `POST /Language/SetDefault`
Sets a language as the project default.

**Request Body: `SetDefaultLanguageRequest`**
```json
{
  "languageName": "English",
  "projectKey": "your-project-key"
}
```

**Response:** `200 OK`

---

### Module

#### `POST /Module/Save`
Creates or updates a module (used to group related translation keys).

**Request Body: `SaveModuleRequest`**
```json
{
  "itemId": "optional-for-update",
  "moduleName": "authentication",
  "projectKey": "your-project-key"
}
```

**Response:** `200 OK` → `ApiResponse`

---

#### `GET /Module/Gets`
Retrieves all modules for a project.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `ProjectKey` | string | The project identifier |

**Response:** `200 OK` → Array of `BlocksLanguageModule`

---

## Data Schemas

### `Key`
```json
{
  "itemId": "string",
  "keyName": "string",
  "moduleId": "string",
  "projectKey": "string",
  "context": "string",
  "shouldPublish": true,
  "isPartiallyTranslated": false,
  "isNewKey": false,
  "createDate": "2024-01-01T00:00:00Z",
  "lastUpdateDate": "2024-01-01T00:00:00Z",
  "routes": ["string"],
  "resources": [
    { "culture": "en", "value": "Hello", "characterLength": 5 }
  ]
}
```

### `Language`
```json
{
  "itemId": "string",
  "languageName": "string",
  "languageCode": "string",
  "isDefault": false,
  "projectKey": "string"
}
```

### `BlocksLanguageModule`
```json
{
  "itemId": "string",
  "moduleName": "string",
  "name": "string",
  "tenantId": "string",
  "createDate": "2024-01-01T00:00:00Z",
  "lastUpdateDate": "2024-01-01T00:00:00Z",
  "createdBy": "string",
  "lastUpdatedBy": "string"
}
```

### `ApiResponse`
```json
{
  "success": true,
  "errorMessage": "string or null",
  "validationErrors": [
    {
      "propertyName": "string",
      "errorMessage": "string",
      "errorCode": "string",
      "severity": 0
    }
  ]
}
```

### `Resource`
```json
{
  "culture": "en",
  "value": "Hello",
  "characterLength": 5
}
```

---

## CRUD Quick Reference

| Operation | Method | Endpoint |
|---|---|---|
| **Create** key | `POST` | `/Key/Save` |
| **Create** bulk keys | `POST` | `/Key/SaveKeys` |
| **Read** single key | `GET` | `/Key/Get` |
| **Read** all keys | `POST` | `/Key/Gets` |
| **Update** key | `POST` | `/Key/Save` (with `itemId`) |
| **Delete** key | `DELETE` | `/Key/Delete` |
| **Rollback** key | `POST` | `/Key/RollBack` |
| **Auto-translate** all | `POST` | `/Key/TranslateAll` |
| **Auto-translate** one | `POST` | `/Key/TranslateKey` |
| **Import** UILM file | `POST` | `/Key/UilmImport` |
| **Export** UILM file | `POST` | `/Key/UilmExport` |
