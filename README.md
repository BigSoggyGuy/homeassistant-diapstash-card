# DiapStash Card

Custom Lovelace dashboard cards for the Home Assistant DiapStash integration.

## Cards

- `custom:diapstash-current-card`
- `custom:diapstash-stock-overview-card`
- `custom:diapstash-stock-type-card`
- `custom:diapstash-low-stock-card`

## Installation with HACS custom repository

Add this repository as a HACS custom repository:

```text
https://github.com/BigSoggyGuy/homeassistant-diapstash-card
```

Repository type:

```text
Dashboard
```

After installation, HACS should add this resource automatically:

```text
/hacsfiles/homeassistant-diapstash-card/homeassistant-diapstash-card.js
```

## Manual installation

Copy the contents of `dist/` to:

```text
/config/www/community/homeassistant-diapstash-card/
```

Add the resource manually:

```text
/local/community/homeassistant-diapstash-card/homeassistant-diapstash-card.js
```

Type: JavaScript module.

## Languages

Supported UI languages:

- English: `en`
- German: `de`
- French: `fr`
- Spanish: `es`

Default:

```yaml
language: auto
```

## Presets

```yaml
preset: fancy
preset: abdl_playful
preset: elegant
preset: platinum
preset: abdl_pastel
preset: candy
preset: bubblegum
```

## Current diaper card

```yaml
type: custom:diapstash-current-card
entity: sensor.diapstash_current_diaper
wearing_entity: binary_sensor.diapstash_wearing
duration_entity: sensor.diapstash_wearing_duration_text
streak_entity: sensor.diapstash_current_streak
language: de
preset: fancy
logo_position: right
```

## Stock overview card

Since `0.10.0-preview.1`, the stock overview card shows all brands and all stock types by default.

```yaml
type: custom:diapstash-stock-overview-card
entity: sensor.diapstash_stock_overview
language: de
preset: abdl_playful
logo_position: right
limit: all
show:
  brands: true
  types: true
  locations: true
  to_wash: true
```

Compact mode, for example only six rows per section:

```yaml
type: custom:diapstash-stock-overview-card
entity: sensor.diapstash_stock_overview
language: de
preset: fancy
limit: 6
```

Separate limits are also possible:

```yaml
type: custom:diapstash-stock-overview-card
entity: sensor.diapstash_stock_overview
language: de
preset: fancy
brand_limit: all
type_limit: 12
```

`limit: 0` also means unlimited.

## Stock type card

```yaml
type: custom:diapstash-stock-type-card
stock_overview_entity: sensor.diapstash_stock_overview
fallback_to_first: true
language: de
preset: fancy
logo_position: right
actions:
  catalog: true
  add: true
```

## Low stock card

```yaml
type: custom:diapstash-low-stock-card
auto_discover: true
entity_prefix: diapstash
language: de
preset: abdl_playful
logo_position: right
```

## Development

This preview build is intentionally dependency-free. The production project can later be migrated to TypeScript/Lit.
