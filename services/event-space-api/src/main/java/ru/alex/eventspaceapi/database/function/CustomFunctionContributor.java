package ru.alex.eventspaceapi.database.function;

import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.dialect.PostgreSQLDialect;

public class CustomFunctionContributor extends PostgreSQLDialect implements FunctionContributor {
    @Override
    public void contributeFunctions(FunctionContributions functionContributions) {
        functionContributions.getFunctionRegistry()
                .register("array_contains_all", new ArrayContainsAllSqlFunction("array_contains_all"));
    }
}
