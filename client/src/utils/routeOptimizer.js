const priorityOrder = {
  Super: 1,
  High: 2,
  Normal: 3,
};

export function optimizeRoute(deliveries) {
  return [...deliveries].sort((a, b) => {
    return (
      priorityOrder[a.priority] -
      priorityOrder[b.priority]
    );
  });
}