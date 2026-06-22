# Changelog

## 0.9.0-preview.1

- Lokalisierung der Einheit `changes` in der Streak-Anzeige.
- Deutsch zeigt nun z. B. `1 Wechsel` statt `1 changes`.
- Französisch/Spanisch/Englisch haben einfache Singular/Plural-Anpassung.

## 0.6.0-preview.1

- `Serie` wurde im Deutschen zu `Streak` geändert.
- Aktuelle-Windel-Karte nutzt jetzt `streak_entity`, Standard: `sensor.diapstash_current_streak`.
- Der Streak-Wert kommt nun bevorzugt aus der festen Streak-Entity statt aus `streak_text`, damit dort nicht versehentlich eine Dauer angezeigt wird.

## 0.5.0-preview.1

- Bessere Lesbarkeit auf bunten Glasflächen.
- Neue Option `text_contrast: high | soft`.
- Standard ist nun `text_contrast: high`.
- Status-Chips nutzen neutrale helle Schrift; Statusfarbe bleibt am Icon/Glow sichtbar.
- Zusätzlicher dunkler Scrim hinter Chips für mehr Kontrast.
- Meta-, Metric- und Listen-Texte bekommen in High-Contrast-Modus stärkeren Textschatten.

## 0.4.0-preview.1

- Deutlich kräftigere Farbtints und weniger graue Flächen.
- Neue Palette `rainbow`.
- Metrics, Listen und Meta-Felder bekommen nun eigene Farb-Tones.
- Stock-Type-Karte kann jetzt aus `sensor.diapstash_stock_overview` den ersten Typ aus `stock_by_type` anzeigen, wenn keine dynamische `sensor.diapstash_stock_type_*` Entity existiert.
- Standardpaletten stärker gesättigt.

## 0.3.0-preview.1

- Neue bunte Paletten: `diapstash`, `abdl_pastel`, `bubblegum`, `candy`, `nursery`, `mint`, `sunset`, `night`, `neutral`.
- Neue Option `palette`.
- Neue Option `colors` für eigene CSS-Farbvariablen.
- Standardpalette bleibt DiapStash, aber mit deutlich stärkerem Farbtint.
- Beispiele enthalten nun buntere Paletten.

## 0.2.0-preview.1

- Überarbeitetes Liquid-Glass-inspiriertes Design.
- Deutlich transparentere Karten mit Glas-Ebenen, Glanzlichtern, Reflexions-Layern und weicheren Pills.
- Neue Option `appearance: liquid | solid`.
- Neue Option `logo_variant: auto | light | dark`.
- Stock-Type-Karte fällt jetzt automatisch auf den ersten vorhandenen `sensor.diapstash_stock_type_*` zurück, wenn die konfigurierte Beispiel-Entity nicht existiert.
- Aktuelle-Windel-Karte hat Fallbacks für ältere deutsche Entity-IDs.
- Beispiele um `appearance: liquid` ergänzt.

## 0.1.0-preview.1

- Erste Preview mit vier Custom Cards.
