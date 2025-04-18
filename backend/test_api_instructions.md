# Backend API Testing Instructions for Quiz App

These instructions will help you test the backend API endpoints to verify the functionality of storing user names, selecting questions by difficulty, storing chosen answers, calculating results with appreciation messages, and storing results.

## 1. Test POST /results - Submit answers and get result

Use the following curl command to submit a quiz result:

```bash
curl -X POST http://localhost:3000/results \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "difficulty": "easy",
  "answers": [
    {"questionId": 1, "chosenAnswer": "A"},
    {"questionId": 2, "chosenAnswer": "B"},
    {"questionId": 3, "chosenAnswer": "C"},
    {"questionId": 4, "chosenAnswer": "D"},
    {"questionId": 5, "chosenAnswer": "A"}
  ]
}'
```

Replace `http://localhost:3000` with your backend server URL and port if different.

Expected response: JSON with success status and the saved result including score and appreciation message.

## 2. Test GET /results - Fetch top 20 results

```bash
curl http://localhost:3000/results
```

Expected response: JSON array of top 20 results sorted by score and date.

## 3. Test GET /results/:difficulty - Fetch results by difficulty

Example for difficulty "easy":

```bash
curl http://localhost:3000/results/easy
```

Expected response: JSON array of top 10 results for the specified difficulty.

---

## Notes

- Ensure your backend server is running before testing.
- You can use tools like Postman or Insomnia for easier API testing with GUI.
- Verify the database tables (users, answers, results) to confirm data is stored correctly.

---

If you want, I can help you with updating the frontend to call these endpoints and display the results and appreciation messages.

Please let me know how you want to proceed.
