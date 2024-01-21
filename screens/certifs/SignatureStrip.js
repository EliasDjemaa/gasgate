import React, { useState, useEffect } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const interpolatePoint = (pointA, pointB) => {
  return {
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2,
  };
};

const SignatureStrip = ({ signature, isSigning, onDragStart, onDragEnd, onSignatureChange }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    console.log('Signature Points:', signature);
  }, [signature]);

  const handlePanResponderMove = (_, gesture) => {
    if (!isDrawing) {
      setIsDrawing(true);
      onDragStart && onDragStart();
    }

    const newPoint = {
      x: gesture.moveX,
      y: gesture.moveY,
    };

    // Check if the signature array is empty or if drawing has been interrupted
    if (!signature || signature.length === 0 || !isDrawing) {
      onSignatureChange && onSignatureChange([newPoint]);
      return;
    }

    const lastPoint = signature[signature.length - 1];

    // Check if the last point is undefined
    if (!lastPoint) {
      onSignatureChange && onSignatureChange([newPoint]);
      return;
    }

    const interpolatedPoint = interpolatePoint(lastPoint, newPoint);

    onSignatureChange && onSignatureChange([...signature, interpolatedPoint, newPoint]);
  };

  const handlePanResponderRelease = () => {
    setIsDrawing(false);
    onDragEnd && onDragEnd();
    onSignatureChange && onSignatureChange([...signature, null]); // Add null to create a new path
  };

  const clearSignature = () => {
    onSignatureChange && onSignatureChange([]);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
    onPanResponderTerminate: handlePanResponderRelease,
  });

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers} style={[styles.canvas, { borderColor: isSigning ? 'black' : 'lightgray' }]}>
        <Svg height="100%" width="100%">
          <Path
            d={signature
              .map((point, index) => (point ? (index === 0 ? 'M' : 'L') + `${point.x} ${point.y}` : ''))
              .join(' ')}
            stroke="black"
            strokeWidth={2}
            fill="transparent"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  canvas: {
    width: '100%',
    height: 700,
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
});

export default SignatureStrip;
