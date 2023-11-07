import React, { useState, useEffect } from 'react';
import AttributeControl from './AttributeControl';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import './CharacterSheet.css';

const CharacterSheet = () => {
  // Create a state object for attributes with initial values
  const initialAttributes = ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = 10;
    return acc;
  }, {});
  const calculateSkillPoints = (intelligence) => {
    const modifier = Math.floor((intelligence - 10) / 2);
    return 10 + (4 * modifier);
};

  const [attributes, setAttributes] = useState(initialAttributes);
  const [selectedClass, setSelectedClass] = useState(null);
  const [skills, setSkills] = useState(
    SKILL_LIST.reduce((acc, skill) => {
      acc[skill.name] = 0; // Initialize each skill with 0 points
      return acc;
    }, {})
  );
  const [skillPoints, setSkillPoints] = useState(calculateSkillPoints(attributes['Intelligence']));
  const totalAttributes = ATTRIBUTE_LIST.reduce((sum, attribute) => sum + attributes[attribute], 0);

  useEffect(() => {
    setSkillPoints(calculateSkillPoints(attributes['Intelligence']));
  }, [attributes['Intelligence']]);

  // Increment attribute value
  const incrementAttribute = (attributeName) => {
    if (totalAttributes < 70) { // Check if total attributes are less than 70 before incrementing
      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attributeName]: prevAttributes[attributeName] + 1
      }));
    }
    else{
        window.alert("Total attributes are at 70, please decrement an attribute to reallocate it");
    }
  };

  // Decrement attribute value
  const decrementAttribute = (attributeName) => {
    if (attributes[attributeName] > 1) { // Ensure attribute value does not go below 1
      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attributeName]: prevAttributes[attributeName] - 1
      }));
    }
  };

  // Toggle display of class requirements
  const toggleClassRequirements = (className) => {
        setSelectedClass(selectedClass === className ? null : className);
  };

  // Function to check if the character meets the requirements for a given class
  const meetsRequirements = (requirements) => {
        return ATTRIBUTE_LIST.every(
            (attribute) => attributes[attribute] >= requirements[attribute]
        );
    };
    
  const allocateSkillPoint = (skillName) => {
    if (skillPoints > 0) {
        setSkills((prevSkills) => ({
        ...prevSkills,
        [skillName]: prevSkills[skillName] + 1
        }));
        setSkillPoints(skillPoints - 1);
    } else {
        alert('No more skill points available to allocate.');
    }
   };

  const removeSkillPoint = (skillName) => {
    if (skills[skillName] > 0) {
        setSkills((prevSkills) => ({
        ...prevSkills,
        [skillName]: prevSkills[skillName] - 1
        }));
        setSkillPoints(skillPoints + 1);
    }
   };
      
      return (
        <div className="character-sheet">
            <div className="attributes-container">
            <h2>Attributes</h2>
                {ATTRIBUTE_LIST.map((attributeName) => (
                <AttributeControl
                    key={attributeName}
                    attributeName={attributeName}
                    value={attributes[attributeName]}
                    onIncrement={() => incrementAttribute(attributeName)}
                    onDecrement={() => decrementAttribute(attributeName)}
                />
                ))}
            </div>
            <div className="classes-container">
            <h2>Classes</h2>
                <div className="classes">
                    {Object.entries(CLASS_LIST).map(([className, requirements]) => (
                    <div key={className}>
                        <button
                        className={`class-name ${meetsRequirements(requirements) ? 'eligible' : ''}`}
                        onClick={() => toggleClassRequirements(className)}
                        >
                        {className}
                        </button>
                        
                        {/* Conditionally render the requirements if this class is selected */}
                        {selectedClass === className && (
                        <div className="class-requirements">
                            {ATTRIBUTE_LIST.map((attribute) => (
                            <div key={attribute}>
                                {attribute}: {requirements[attribute]}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    ))}
                </div>
            </div>
            <div className="skills">
            <h2>Skills</h2>
            <div className="skill-points">
                Skill Points Available: {skillPoints}
            </div>
            {SKILL_LIST.map((skill) => {
                const attributeModifier = Math.floor((attributes[skill.attributeModifier] - 10) / 2);
                const totalSkillValue = skills[skill.name] + attributeModifier;

                return (
                <div key={skill.name} className="skill">
                    <span>{skill.name} - points: {skills[skill.name]}</span>
                    <button onClick={() => allocateSkillPoint(skill.name)}>+</button>
                    <button onClick={() => removeSkillPoint(skill.name)}>-</button>
                    <span>modifier ({skill.attributeModifier}): {attributeModifier}</span>
                    <span>total: {totalSkillValue}</span>
                </div>
                );
            })}
            </div>
        </div>
      );
};

export default CharacterSheet;
