package ru.alex.eventspaceapi.database.function;

import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.metamodel.model.domain.ReturnableType;
import org.hibernate.sql.ast.SqlAstTranslator;
import org.hibernate.sql.ast.spi.SqlAppender;
import org.hibernate.sql.ast.tree.SqlAstNode;
import org.hibernate.type.BasicTypeReference;
import org.hibernate.type.SqlTypes;

import java.util.List;

public class ArrayContainsAllSqlFunction extends StandardSQLFunction {


    private static final BasicTypeReference<Boolean> RETURN_TYPE = new BasicTypeReference<>("boolean", Boolean.class, SqlTypes.BOOLEAN);

    public ArrayContainsAllSqlFunction(final String functionName) {
        super(functionName, true, RETURN_TYPE);
    }

    @Override
    public void render(SqlAppender sqlAppender, List<? extends SqlAstNode> sqlAstArguments, ReturnableType<?> returnType, SqlAstTranslator<?> translator) {
        if(sqlAstArguments.size() != 2) {
            throw new IllegalArgumentException("Function '%s' requires exactly 2 arguments".formatted(getName()));
        }
        sqlAppender.append("(");
        sqlAstArguments.getFirst().accept(translator);
        sqlAppender.append(" @> ");
        sqlAppender.append("(");
        sqlAstArguments.get(1).accept(translator);
        sqlAppender.append(")::text[]");
        sqlAppender.append(")");
    }
}
