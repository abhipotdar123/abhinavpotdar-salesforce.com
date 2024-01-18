public class FieldListController {
    public List<FieldInfoWrapper> fieldInfo { get; set; }
    public Integer totalCount { get; set; }

    public FieldListController() {
        String objectAPIName = 'Contact';
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.SObjectType objectSchema = schemaMap.get(objectAPIName);

        if (objectSchema != null) {
            Map<String, Schema.SObjectField> fieldMap = objectSchema.getDescribe().fields.getMap();

            fieldInfo = new List<FieldInfoWrapper>();
            totalCount = 0;

            for (String fieldName : fieldMap.keySet()) {
                Schema.SObjectField field = fieldMap.get(fieldName);

                // Check if the field is visible before adding it
                if (field.getDescribe().isAccessible()) {
                    String fieldType = field.getDescribe().getType().name();
					/*
                    // Skip fields with a data type of 'Double'
                    if (fieldType.equalsIgnoreCase('Double')) {
                        continue;
                    }
					*/
                    String fieldLabel = field.getDescribe().getLabel();
                    String picklistValues ='';
					
                    // If the field is a picklist, retrieve and format its values
                    if (fieldType.equalsIgnoreCase('Picklist')) {
                        List<Schema.PicklistEntry> picklistEntries = field.getDescribe().getPicklistValues();
                        for (Schema.PicklistEntry entry : picklistEntries) {
                            picklistValues += entry.getLabel() + ', ';
                        }
                        // Remove trailing comma and space
                        if (!String.isEmpty(picklistValues)) {
                            picklistValues = picklistValues.substring(0, picklistValues.length() - 2);
                        }
                    }
					/*
                    // Update data type label for 'Integer' fields to 'Number'
                    if (fieldType.equalsIgnoreCase('Integer')) {
                        fieldType = 'Number';
                    }*/

                    FieldInfoWrapper fieldWrapper = new FieldInfoWrapper(fieldLabel, fieldType, picklistValues);
                    fieldInfo.add(fieldWrapper);

                    // Increment the total count
                    totalCount++;
                }
            }
        }
    }

    public class FieldInfoWrapper {
        public String fieldLabel { get; set; }
        public String fieldType { get; set; }
        public String picklistValues { get; set; }

        public FieldInfoWrapper(String label, String type, String values) {
            fieldLabel = label;
            fieldType = type;
            picklistValues = values;
        }
    }
}